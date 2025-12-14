"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// React wrapper around the original DemoIconsWorld-style effect.

const CANVAS_W = 160;
const CANVAS_H = 40;

// Brand colors (papaya + yellow) in HSL hue space
// papaya: #FF8000  ≈ 30°  → 30 / 360
// yellow: #FFD700 ≈ 50°  → 50 / 360
const PAPAYA_HUE = 30 / 360;
const YELLOW_HUE = 50 / 360;

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
};

const ensureLink = (href) => {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

const ParticleOne = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let viewInstance = null;
    let destroyed = false;

    const container = containerRef.current;

    const init = async () => {
      // Load fonts and animation libs like the original demo
      ensureLink("https://fonts.googleapis.com/css?family=Source+Code+Pro:600");
      ensureLink(
        "https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
      );

      // Load WebFont first (required before calling WebFont.load)
      await loadScript(
        "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
      );

      // Load GSAP and CreateJS in parallel to reduce startup delay
      await Promise.all([
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"
        ),
        loadScript("https://code.createjs.com/createjs-2015.11.26.min.js"),
      ]);

      if (destroyed) return;

      const WebFontGlobal = window.WebFont;
      if (!WebFontGlobal) return;

      WebFontGlobal.load({
        custom: {
          families: ["Source Code Pro", "FontAwesome"],
          urls: [
            "https://fonts.googleapis.com/css?family=Source+Code+Pro:600",
            "https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css",
          ],
          testStrings: {
            FontAwesome: "\uf001",
          },
        },
        active: () => {
          if (destroyed) return;
          viewInstance = createWorld(container);
        },
      });
    };

    init();

    return () => {
      destroyed = true;
      if (viewInstance && viewInstance.dispose) {
        viewInstance.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <div
        id="coverBlack"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 1,
          background: "transparent",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// Adapted BasicView and DemoIconsWorld to mount inside a React container.

const createWorld = (containerElement) => {
  const helpers = {};

  function BasicView() {
    this.containerElement = containerElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.containerElement.clientWidth / this.containerElement.clientHeight,
      1,
      200000
    );
    this.camera.position.z = -1000;

    const needAntialias = window.devicePixelRatio === 1.0;
    // Enable alpha so the canvas background is transparent and the
    // underlying bg-papaya layer remains visible.
    this.renderer = new THREE.WebGLRenderer({
      antialias: needAntialias,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0); // transparent clear
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setSize(
      this.containerElement.clientWidth,
      this.containerElement.clientHeight
    );
    this.containerElement.appendChild(this.renderer.domElement);

    this._stopped = false;
    this._boundResize = this.handleResize.bind(this);
    window.addEventListener("resize", this._boundResize, false);
  }

  BasicView.prototype.handleResize = function () {
    if (!this.containerElement) return;
    this.camera.aspect =
      this.containerElement.clientWidth / this.containerElement.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.containerElement.clientWidth,
      this.containerElement.clientHeight
    );
  };

  BasicView.prototype.startRendering = function () {
    this.update();
  };

  BasicView.prototype.update = function () {
    if (this._stopped) return;
    requestAnimationFrame(this.update.bind(this));
    this.onTick();
    this.render();
  };

  BasicView.prototype.render = function () {
    this.renderer.render(this.scene, this.camera);
  };

  BasicView.prototype.onTick = function () {};

  BasicView.prototype.dispose = function () {
    this._stopped = true;
    window.removeEventListener("resize", this._boundResize, false);
    if (this.renderer && this.renderer.domElement) {
      if (this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(
          this.renderer.domElement
        );
      }
      this.renderer.dispose();
    }
  };

  function DemoIconsWorld() {
    BasicView.call(this);

    this.CANVAS_W = CANVAS_W;
    this.CANVAS_H = CANVAS_H;
    this.WORD_LIST = ["MenuLink"]; // only one word
    this._matrixLength = 3;
    this._particleList = [];
    this._wordIndex = 0;
    this.HELPER_ZERO = new THREE.Vector3(0, 0, 0);
    this.setup();
    this.createLogo();
    this.startRendering();
  }

  DemoIconsWorld.prototype = Object.create(BasicView.prototype);
  DemoIconsWorld.prototype.constructor = DemoIconsWorld;

  DemoIconsWorld.prototype.setup = function () {
    this.camera.far = 100000;
    this.camera.near = 1;
    this.camera.position.z = 5000;
    this.camera.lookAt(this.HELPER_ZERO);

    const plane = new THREE.PlaneGeometry(50000, 50000, 1, 1);
    const texLoader = new THREE.TextureLoader();
    texLoader.setCrossOrigin("anonymous");
    const bgTexture = texLoader.load(
      "http://ics-web.jp/lab-data/150601_threejs_mosaic/imgs/bg.png"
    );
    const mat = new THREE.MeshBasicMaterial({ map: bgTexture });
    // Make the internal background plane fully transparent so the
    // external bg-papaya layer shows through.
    mat.transparent = true;
    mat.opacity = 0;
    const bg = new THREE.Mesh(plane, mat);
    bg.position.z = -10000;
    this.scene.add(bg);
    this._bg = bg;

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    this.scene.add(light);

    this._wrap = new THREE.Object3D();
    this.scene.add(this._wrap);

    const container = new window.createjs.Container();
    const SIZE = 256;
    for (
      let i = 0, len = this._matrixLength * this._matrixLength;
      i < len;
      i++
    ) {
      const char = String.fromCharCode(61730 + i);
      const text2 = new window.createjs.Text(char, "200px FontAwesome", "#FFF");
      text2.textBaseline = "middle";
      text2.textAlign = "center";
      text2.x = SIZE * (i % this._matrixLength) + SIZE / 2;
      text2.y = SIZE * Math.floor(i / this._matrixLength) + SIZE / 2;
      container.addChild(text2);
    }
    container.cache(0, 0, SIZE * this._matrixLength, SIZE * this._matrixLength);
    const cacheUrl = container.getCacheDataURL();
    const image = new Image();
    image.src = cacheUrl;
    const texture = new THREE.Texture(image);
    texture.needsUpdate = true;

    const ux = 1 / this._matrixLength;
    const uy = 1 / this._matrixLength;
    this._particleList = [];
    for (let i = 0; i < this.CANVAS_W; i++) {
      for (let j = 0; j < this.CANVAS_H; j++) {
        const ox = (this._matrixLength * Math.random()) >> 0;
        const oy = (this._matrixLength * Math.random()) >> 0;
        const geometry = new THREE.PlaneGeometry(40, 40, 1, 1);
        this.change_uvs(geometry, ux, uy, ox, oy);
        const material = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        });
        material.blending = THREE.AdditiveBlending;
        const word = new THREE.Mesh(geometry, material);
        this._wrap.add(word);
        this._particleList.push(word);
      }
    }

    this.createParticleCloud();
  };

  DemoIconsWorld.prototype.createParticleCloud = function () {
    const numParticles = 50000;
    const SIZE = 10000;

    const positions = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const idx = i * 3;
      positions[idx] = SIZE * (Math.random() - 0.5);
      positions[idx + 1] = SIZE * (Math.random() - 0.5);
      positions[idx + 2] = SIZE * (Math.random() - 0.5);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const texLoader = new THREE.TextureLoader();
    texLoader.setCrossOrigin("anonymous");
    const texture = texLoader.load(
      "http://ics-web.jp/lab-data/150601_threejs_mosaic/imgs/fire_particle.png"
    );

    const material = new THREE.PointsMaterial({
      size: 30,
      color: 0x444444,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: false,
      map: texture,
    });

    const mesh = new THREE.Points(geometry, material);
    mesh.position.set(0, 0, 0);
    this.scene.add(mesh);
  };

  DemoIconsWorld.prototype.createLogo = function () {
    const FONT_NAME = "Source Code Pro";
    const canvas = document.createElement("canvas");
    canvas.width = this.CANVAS_W;
    canvas.height = this.CANVAS_H;
    const stage = new window.createjs.Stage(canvas);
    const text1 = new window.createjs.Text(
      this.WORD_LIST[this._wordIndex],
      "30px " + FONT_NAME,
      "#FFF"
    );
    this._wordIndex++;
    if (this._wordIndex >= this.WORD_LIST.length) {
      this._wordIndex = 0;
    }
    text1.textAlign = "center";
    text1.x = this.CANVAS_W / 2;
    stage.addChild(text1);
    stage.update();

    // Single-run timeline: play once, do not loop
    const timeline = new window.TimelineMax();

    const ctx = canvas.getContext("2d");
    for (let i = 0; i < this._particleList.length; i++) {
      this._particleList[i].visible = false;
    }

    const pixcelColors = ctx.getImageData(
      0,
      0,
      this.CANVAS_W,
      this.CANVAS_H
    ).data;
    const existDotList = [];
    let existDotCount = 0;
    for (let i = 0; i < this.CANVAS_W; i++) {
      existDotList[i] = [];
      for (let j = 0; j < this.CANVAS_H; j++) {
        const flag =
          pixcelColors[(i + j * this.CANVAS_W) * 4 + 3] === 0 ? true : false;
        existDotList[i][j] = flag;
        if (flag === true) existDotCount++;
      }
    }

    let cnt = 0;
    const max = this.CANVAS_W * this.CANVAS_H;
    for (let i = 0; i < this.CANVAS_W; i++) {
      for (let j = 0; j < this.CANVAS_H; j++) {
        if (existDotList[i][j] === true) continue;
        const word = this._particleList[cnt];
        // Horizontal gradient from papaya to yellow with slight brightness variation
        const t = i / this.CANVAS_W; // 0 → 1 across the word
        const hue = PAPAYA_HUE + (YELLOW_HUE - PAPAYA_HUE) * t;
        const lightness = 0.6 + 0.2 * Math.random();
        word.material.color.setHSL(hue, 1.0, lightness);
        word.material.blending = THREE.AdditiveBlending;
        this._wrap.add(word);
        const toObj = {
          x: (i - canvas.width / 2) * 20,
          y: (canvas.height / 2 - j) * 20,
          z: 0,
        };
        const fromObj = {
          x: 2000 * (Math.random() - 0.5) - 500,
          y: 1000 * (Math.random() - 0.5),
          z: 10000,
        };
        word.position.set(fromObj.x, fromObj.y, fromObj.z);
        const toRotationObj = { z: 0 };
        const fromRotationObj = {
          z: 10 * Math.PI * (Math.random() - 0.5),
        };
        word.rotation.z = fromRotationObj.z;
        // Start particles more quickly: reduce the initial delay so
        // the logo begins forming almost immediately after mount.
        const delay =
          window.Cubic.easeInOut.getRatio(cnt / 1600) * 1.5 +
          0.1 * Math.random();
        timeline.to(
          word.rotation,
          6.0,
          {
            z: toRotationObj.z,
            ease: window.Cubic.easeInOut,
          },
          delay
        );

        word.visible = false;
        timeline.set(
          word,
          {
            visible: true,
          },
          delay
        );
        timeline.to(
          word.position,
          7.0,
          {
            bezier: [
              fromObj,
              {
                x: (0 + toObj.x) / 2 + 300,
                y: (fromObj.y + toObj.y) / 2 + 500 * Math.random(),
                z: (fromObj.z + toObj.z) / 2,
              },
              toObj,
            ],
            delay: delay / 1.0,
            ease: window.Expo.easeInOut,
          },
          0
        );
        cnt++;
      }
    }

    this._wrap.position.z = -5000;
    timeline.to(
      this._wrap.position,
      12.0,
      {
        z: 6000,
        ease: window.Quart.easeIn,
      },
      0
    );
    // Fixed camera path: close to center, zooming out (the variant you liked)
    timeline.set(
      this.camera.position,
      {
        x: 200,
        y: -200,
        z: 1000,
      },
      0
    );
    timeline.to(
      this.camera.position,
      14.0,
      {
        x: 0,
        y: 0,
        z: 5000,
        ease: window.Quart.easeInOut,
      },
      0
    );
    timeline.set(
      this.camera,
      {
        fov: 90,
      },
      0
    );
    timeline.to(
      this.camera,
      14.0,
      {
        fov: 45,
        ease: window.Quart.easeInOut,
      },
      0
    );

    timeline.to(
      "#coverBlack",
      1.0,
      {
        css: { opacity: 0.0 },
      },
      0.0
    );

    // Fixed timing: stable playback, no slow motion
    timeline.timeScale(1.0);

    // Set background tint to a darker papaya tone
    this._bg.material.color.setHSL(PAPAYA_HUE, 1.0, 0.25);
  };

  DemoIconsWorld.prototype.onTick = function () {
    BasicView.prototype.onTick.call(this);
    this.camera.lookAt(this.HELPER_ZERO);
    const vec = this.camera.position.clone();
    vec.negate();
    vec.normalize();
    vec.multiplyScalar(10000);
    this._bg.position.copy(vec);
    this._bg.lookAt(this.camera.position);
  };

  DemoIconsWorld.prototype.change_uvs = function (
    geometry,
    unitx,
    unity,
    offsetx,
    offsety
  ) {
    // three r125+ uses BufferGeometry with uv attribute
    const uvAttr = geometry.attributes && geometry.attributes.uv;
    if (!uvAttr) return;
    for (let i = 0; i < uvAttr.count; i++) {
      const u = uvAttr.getX(i);
      const v = uvAttr.getY(i);
      uvAttr.setXY(i, (u + offsetx) * unitx, (v + offsety) * unity);
    }
    uvAttr.needsUpdate = true;
  };

  const world = new DemoIconsWorld();
  helpers.view = world;

  return {
    dispose: () => {
      if (world && world.dispose) {
        world.dispose();
      }
    },
  };
};

export default ParticleOne;
