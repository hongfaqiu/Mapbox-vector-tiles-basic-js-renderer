// @flow
const Painter = require('../render/painter');

const layerStylesheetFromLayer = layer => layer && layer._eventedParent.stylesheet.layers.find(x=>x.id === layer.id);

class BasicPainter extends Painter {
    constructor(gl, transform) {
        super(gl, transform);
        this._filterForZoom = 15;
    }
    resize(width, height) {
        const gl = this.context.gl;
        this.width = width;
        this.height = height;
        gl.viewport(0, 0, this.width, this.height);
    }
    renderLayer(painter, sourceCache, layer, coords) {
        const layerStylesheet = layerStylesheetFromLayer(layer);
        if (layerStylesheet && coords[0] && layerStylesheet.minzoom_ && coords[0].overscaledZ < layerStylesheet.minzoom_) return;
        if (layerStylesheet && coords[0] && layerStylesheet.maxzoom_ && coords[0].overscaledZ >= layerStylesheet.maxzoom_) return;
        super.renderLayer(painter, sourceCache, layer, coords);
    }
}

module.exports = BasicPainter;
