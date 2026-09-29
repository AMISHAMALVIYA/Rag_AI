



const { pipeline } = require("@xenova/transformers");

let model;

async function loadModel() {
    if (!model) {
        try {
            model = await pipeline(
                "feature-extraction",
                "Xenova/all-MiniLM-L6-v2"
            );
        } catch (err) {
            console.error("ERROR:", err);
            console.error("CAUSE:", err.cause);
            throw err;
        }
    }
    return model;
}

async function createEmbedding(text) {
    const embedder = await loadModel();

    const output = await embedder(text, {
        pooling: "mean",
        normalize: true
    });

    return Array.from(output.data);
}

module.exports = createEmbedding;