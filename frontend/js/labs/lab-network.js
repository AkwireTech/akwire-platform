// ============================================
// AKWIRE LAB ENGINE v2
// Virtual Network Manager
// ============================================

export class NetworkMap {

    constructor() {

        this.reset();

    }

    // ----------------------------
    // Reset Network
    // ----------------------------

    reset() {

        this.nodes = {};

        this.connections = [];

    }

    // ----------------------------
    // Load Network
    // ----------------------------

    load(network) {

        this.reset();

        if (!network) return;

        this.nodes = network.nodes || {};

        this.connections =
            network.connections || [];

    }

    // ----------------------------
    // Get Node
    // ----------------------------

    getNode(id) {

        return this.nodes[id] || null;

    }

    // ----------------------------
    // Update Node Status
    // ----------------------------

    setStatus(id, status) {

        if (!this.nodes[id]) return;

        this.nodes[id].status = status;

    }

    // ----------------------------
    // Connect Nodes
    // ----------------------------

    connect(from, to) {

        this.connections.push({

            from,

            to

        });

    }

    // ----------------------------
    // Disconnect Nodes
    // ----------------------------

    disconnect(from, to) {

        this.connections =
            this.connections.filter(c =>
                !(c.from === from && c.to === to)
            );

    }

    // ----------------------------
    // Get Connections
    // ----------------------------

    getConnections() {

        return this.connections;

    }

    // ----------------------------
    // Get Network Snapshot
    // ----------------------------

    snapshot() {

        return {

            nodes: this.nodes,

            connections: this.connections

        };

    }

}