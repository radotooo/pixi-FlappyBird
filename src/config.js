export default {
  view: {
    width: 900,
    height: 450,
    backgroundColor: 0xffffff,
    worldWidth: 1000,
    worldHeight: 500,
    // resizeTo: window,
    centerOnResize: true,
  },
  game: {
    width: 1000,
    height: 500,
    drag: false,
    pinch: true,
    decelerate: true,
    wheel: false,
  },
  scenes: {
    Splash: {
      hideDelay: 0,
    },
  },
  assets: {
    root: '/',
  },
};
