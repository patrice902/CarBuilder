// Theme
export const THEME_SET = "THEME_SET";
export const THEMES = {
  DEFAULT: "DEFAULT",
  DARK: "DARK",
  LIGHT: "LIGHT",
  BLUE: "BLUE",
  GREEN: "GREEN",
  INDIGO: "INDIGO",
};

export const LayerTypes = {
  TEXT: 1,
  LOGO: 2,
  BASE: 3,
  OVERLAY: 4,
  UPLOAD: 5,
  CAR: 6,
  SHAPE: 7,
};

export const PaintingGuides = {
  CARMASK: "car-mask",
  WIREFRAME: "wireframe",
  SPONSORBLOCKS: "sponsor-blocks",
  NUMBERBLOCKS: "number-blocks",
  GRID: "grid",
};

export const ViewModes = {
  NORMAL_VIEW: "normal",
  SPEC_VIEW: "spec",
};

export const Palette = {
  red: "#ff0000",
  blue: "#0000ff",
  green: "#00ff00",
  yellow: "#FFFF00",
  cyan: "#00FFFF",
  lime: "#BFFF00",
  gray: "#808080",
  orange: "#FFA500",
  purple: "#800080",
  black: "#000000",
  white: "#FFFFFF",
  pink: "#FFC0CB",
  darkblue: "#00008b",
};

export const DialogTypes = {
  BASEPAINT: "BASEPAINT",
  SHAPE: "SHAPE",
  LOGO: "LOGO",
  UPLOAD: "UPLOAD",
  TEXT: "TEXT",
  DEFAULT_SHAPE_SETTINGS: "DEFAULT_SHAPE_SETTINGS",
  SHORTCUTS: "SHORTCUTS",
  SETTINGS: "SETTINGS",
  SHARING: "SHARING",
  RACE: "RACE",
  RACE_CONFIRM: "RACE_CONFIRM",
  SIM_PREVIEW_GUIDE: "SIM_PREVIEW_GUIDE",
};

export const DrawingStatus = {
  CLEAR_COMMAND: "CLEAR_COMMAND",
  ADD_TO_SHAPE: "ADD_TO_SHAPE",
  DRAWING_SHAPE: "DRAWING_SHAPE",
  TRANSFORMING_SHAPE: "TRANSFORMING_SHAPE",
};

export const FinishOptions = [
  {
    label: "Normal",
    value: "#0000FF",
    base: "normal",
  },
  {
    label: "Glossy",
    value: "#0F0F0F",
    base: "glossy",
  },
  {
    label: "Flat",
    value: "#00FF00",
    base: "flat",
  },
  {
    label: "Matte",
    value: "#1C83B3",
    base: "matte",
  },
  {
    label: "Semi-Metallic",
    value: "#BB2929",
    base: "semi-metallic",
  },
  {
    label: "Metallic",
    value: "#FF55FF",
    base: "metallic",
  },
  {
    label: "Chrome",
    value: "#FF0000",
    base: "chrome",
  },
];

export const DefaultLayer = {
  upload_id: 0,
  layer_visible: 1,
  layer_locked: 0,
  layer_order: 1,
  time_modified: 0,
  confirm: "",
  layer_data: {
    name: "",
    text: "",
    width: 0,
    height: 0,
    radius: 0,
    innerRadius: 0,
    outerRadius: 0,
    left: 0,
    top: 0,
    rotation: 0,
    flop: 0,
    flip: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
    stroke: 0,
    paddingX: 0,
    paddingY: 0,
    strokeType: "middle",
    font: 0,
    size: 0,
    sizeLocked: true,
    scolor: null,
    color: null,
    bgColor: null,
    blendType: "normal",
    opacity: 1,
    shadowColor: null,
    shadowBlur: 0,
    shadowOpacity: 1,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    cornerTopLeft: 0,
    cornerTopRight: 0,
    cornerBottomLeft: 0,
    cornerBottomRight: 0,
    numPoints: 5,
    angle: 60,
    points: [],
    lineCap: "round",
    lineJoin: "round",
    pointerLength: 20,
    pointerWidth: 20,
    finish: FinishOptions[0].value,
  },
};

export const MouseModes = {
  DEFAULT: "DEFAULT",
  RECT: "Rectangle",
  CIRCLE: "Circle",
  ELLIPSE: "Ellipse",
  REGULARPOLYGON: "Regular Polygon",
  ARROW: "Arrow",
  LINE: "Line",
  WEDGE: "Wedge",
  POLYGON: "Polygon",
  SOFTPOLYGON: "Soft Polygon",
  STAR: "Star",
  RING: "Ring",
  ARC: "Arc",
  PEN: "Pen",
};

export const HistoryActions = {
  SCHEME_CHANGE_ACTION: "SCHEME_CHANGE_ACTION",
  LAYER_ADD_ACTION: "LAYER_ADD_ACTION",
  LAYER_CHANGE_ACTION: "LAYER_CHANGE_ACTION",
  LAYER_DELETE_ACTION: "LAYER_DELETE_ACTION",
  LAYER_LIST_ADD_ACTION: "LAYER_LIST_ADD_ACTION",
  LAYER_LIST_DELETE_ACTION: "LAYER_LIST_DELETE_ACTION",
};

export const funWords = [
  "Amazing",
  "Astounding",
  "Awesome",
  "Beautiful",
  "Breathtaking",
  "Brilliant",
  "Clean",
  "Cool",
  "Custom",
  "Dandy",
  "Divine",
  "Electric",
  "Elegant",
  "Excellent",
  "Fancy",
  "Fantastic",
  "Fast",
  "Fine",
  "Glorious",
  "Gorgeous",
  "Grand",
  "Hot",
  "Lovely",
  "Magnificent",
  "Marvelous",
  "Neat",
  "New",
  "Nifty",
  "Pleasant",
  "Quick",
  "Radiant",
  "Remarkable",
  "Sensational",
  "Shiny",
  "Sleek",
  "Snappy",
  "Speedy",
  "Spiffy",
  "Splendid",
  "Sporty",
  "Striking",
  "Stunning",
  "Stylish",
  "Super",
  "Superior",
  "Wonderful",
];

export const AllowedLayerProps = {
  [LayerTypes.TEXT]: [
    "layer_visible",
    "layer_locked",
    "clone",
    "delete",
    "layer_data",
    "layer_data.name",
    "layer_data.text",
    // "layer_data.width",
    // "layer_data.height",
    "layer_data.left",
    "layer_data.top",
    "layer_data.scaleX",
    "layer_data.scaleY",
    "layer_data.skewX",
    "layer_data.skewY",
    "layer_data.rotation",
    "layer_data.flop",
    "layer_data.flip",
    "layer_data.font",
    "layer_data.color",
    "layer_data.size",
    "layer_data.sizeLocked",
    "layer_data.stroke",
    "layer_data.scolor",
    "layer_data.opacity",
    "layer_data.shadowColor",
    "layer_data.shadowBlur",
    "layer_data.shadowOpacity",
    "layer_data.shadowBlur",
    "layer_data.shadowOffsetX",
    "layer_data.shadowOffsetY",
    "layer_data.finish",
    "layer_data.legacy",
  ],
  [LayerTypes.LOGO]: [
    "layer_visible",
    "layer_locked",
    "clone",
    "delete",
    "layer_data",
    "layer_data.name",
    "layer_data.width",
    "layer_data.height",
    "layer_data.sizeLocked",
    "layer_data.skewX",
    "layer_data.skewY",
    "layer_data.left",
    "layer_data.top",
    "layer_data.rotation",
    "layer_data.flop",
    "layer_data.flip",
    "layer_data.color",
    "layer_data.opacity",
    "layer_data.shadowColor",
    "layer_data.shadowBlur",
    "layer_data.shadowOpacity",
    "layer_data.shadowBlur",
    "layer_data.shadowOffsetX",
    "layer_data.shadowOffsetY",
    "layer_data.paddingX",
    "layer_data.paddingY",
    "layer_data.bgColor",
    "layer_data.finish",
    "layer_data.legacy",
  ],
  [LayerTypes.OVERLAY]: [
    "layer_visible",
    "layer_locked",
    "clone",
    "delete",
    "layer_data",
    "layer_data.name",
    "layer_data.width",
    "layer_data.height",
    "layer_data.sizeLocked",
    "layer_data.skewX",
    "layer_data.skewY",
    "layer_data.left",
    "layer_data.top",
    "layer_data.rotation",
    "layer_data.flop",
    "layer_data.flip",
    "layer_data.opacity",
    "layer_data.color",
    "layer_data.shadowColor",
    "layer_data.shadowBlur",
    "layer_data.shadowOpacity",
    "layer_data.shadowBlur",
    "layer_data.shadowOffsetX",
    "layer_data.shadowOffsetY",
    "layer_data.stroke",
    "layer_data.scolor",
    "layer_data.finish",
    "layer_data.legacy",
  ],
  [LayerTypes.SHAPE]: {
    [MouseModes.RECT]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.width",
      "layer_data.height",
      "layer_data.sizeLocked",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.left",
      "layer_data.top",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.strokeType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.cornerTopLeft",
      "layer_data.cornerTopRight",
      "layer_data.cornerBottomLeft",
      "layer_data.cornerBottomRight",
      "layer_data.finish",
    ],
    [MouseModes.CIRCLE]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.radius",
      "layer_data.left",
      "layer_data.top",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.sizeLocked",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.strokeType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.ELLIPSE]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.width",
      "layer_data.height",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.sizeLocked",
      "layer_data.left",
      "layer_data.top",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.strokeType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.STAR]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.innerRadius",
      "layer_data.outerRadius",
      "layer_data.numPoints",
      "layer_data.left",
      "layer_data.top",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.sizeLocked",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.RING]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.innerRadius",
      "layer_data.outerRadius",
      "layer_data.sizeLocked",
      "layer_data.left",
      "layer_data.top",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.strokeType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.REGULARPOLYGON]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.radius",
      "layer_data.numPoints",
      "layer_data.left",
      "layer_data.top",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.sizeLocked",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.strokeType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.WEDGE]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.radius",
      "layer_data.angle",
      "layer_data.left",
      "layer_data.top",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.sizeLocked",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.strokeType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.ARC]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.sizeLocked",
      "layer_data.innerRadius",
      "layer_data.outerRadius",
      "layer_data.angle",
      "layer_data.left",
      "layer_data.top",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.strokeType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.LINE]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.left",
      "layer_data.top",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.points",
      "layer_data.lineCap",
      "layer_data.lineJoin",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.blendType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.POLYGON]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.left",
      "layer_data.top",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.points",
      "layer_data.lineCap",
      "layer_data.lineJoin",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.opacity",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.ARROW]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.left",
      "layer_data.top",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.points",
      "layer_data.lineCap",
      "layer_data.lineJoin",
      "layer_data.pointerLength",
      "layer_data.pointerWidth",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.color",
      "layer_data.blendType",
      "layer_data.opacity",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.strokeType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
    [MouseModes.PEN]: [
      "layer_visible",
      "layer_locked",
      "clone",
      "delete",
      "layer_data",
      "layer_data.name",
      "layer_data.type",
      "layer_data.left",
      "layer_data.top",
      "layer_data.skewX",
      "layer_data.skewY",
      "layer_data.points",
      "layer_data.lineCap",
      "layer_data.lineJoin",
      "layer_data.rotation",
      "layer_data.flop",
      "layer_data.flip",
      "layer_data.opacity",
      "layer_data.stroke",
      "layer_data.scolor",
      "layer_data.blendType",
      "layer_data.shadowColor",
      "layer_data.shadowBlur",
      "layer_data.shadowOpacity",
      "layer_data.shadowBlur",
      "layer_data.shadowOffsetX",
      "layer_data.shadowOffsetY",
      "layer_data.finish",
    ],
  },
  [LayerTypes.UPLOAD]: [
    "layer_visible",
    "layer_locked",
    "clone",
    "delete",
    "layer_data",
    "layer_data.name",
    "layer_data.width",
    "layer_data.height",
    "layer_data.left",
    "layer_data.top",
    "layer_data.skewX",
    "layer_data.skewY",
    "layer_data.sizeLocked",
    "layer_data.rotation",
    "layer_data.flop",
    "layer_data.flip",
    "layer_data.opacity",
    "layer_data.shadowColor",
    "layer_data.shadowBlur",
    "layer_data.shadowOpacity",
    "layer_data.shadowBlur",
    "layer_data.shadowOffsetX",
    "layer_data.shadowOffsetY",
    "layer_data.paddingX",
    "layer_data.paddingY",
    "layer_data.bgColor",
    "layer_data.finish",
    "layer_data.legacy",
    "layer_data.fromOldSource",
  ],
  [LayerTypes.BASE]: [
    "layer_data.name",
    "layer_visible",
    "delete",
    "layer_data",
    "layer_data.opacity",
    "layer_data.color",
    "layer_data.finish",
  ],
  [LayerTypes.CAR]: [
    "layer_data.name",
    "layer_visible",
    "layer_data",
    "layer_data.color",
    "layer_data.finish",
  ],
};
