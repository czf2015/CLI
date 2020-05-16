export default class Node {
    constructor(name) {
        this.name = name;
        this.computed = false;
        this.indegree = 0;
        this.inputs = new Set;
        this.outputs = new Set;
    }
}