"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBRepo = void 0;
class DBRepo {
    model;
    constructor(model) {
        this.model = model;
    }
    // ================= FIND MANY =================
    async find(filter = {}, projection, options) {
        return this.model.find(filter, projection, options);
    }
    // ================= FIND ONE =================
    async findOne(filter, projection, options) {
        return this.model.findOne(filter, projection, options);
    }
    // ================= FIND BY ID =================
    async findById(id, projection, options) {
        return this.model.findById(id, projection, options);
    }
    // ================= CREATE ONE / MANY =================
    async create(data) {
        if (!Array.isArray(data)) {
            return this.model.create(data);
        }
        return this.model.create(data);
    }
    // ================= UPDATE ONE =================
    async updateOne(filter, update, options) {
        return this.model.updateOne(filter, update, options);
    }
    // ================= UPDATE MANY =================
    async updateMany(filter, update, options) {
        return this.model.updateMany(filter, update, options);
    }
    // ================= FIND ONE AND UPDATE =================
    async findOneAndUpdate(filter, update, options) {
        return this.model.findOneAndUpdate(filter, update, {
            new: true,
            ...options,
        });
    }
    // ================= FIND BY ID AND UPDATE =================
    async findByIdAndUpdate(id, update, options) {
        return this.model.findByIdAndUpdate(id, update, {
            new: true,
            ...options,
        });
    }
    // ================= DELETE ONE =================
    async deleteOne(filter) {
        return this.model.deleteOne(filter);
    }
    // ================= DELETE MANY =================
    async deleteMany(filter) {
        return this.model.deleteMany(filter);
    }
    // ================= FIND ONE AND DELETE =================
    async findOneAndDelete(filter) {
        return this.model.findOneAndDelete(filter);
    }
    // ================= FIND BY ID AND DELETE =================
    async findByIdAndDelete(id) {
        return this.model.findByIdAndDelete(id);
    }
    // ================= COUNT =================
    async count(filter = {}) {
        return this.model.countDocuments(filter);
    }
    // ================= EXISTS =================
    async exists(filter) {
        const result = await this.model.exists(filter);
        return !!result;
    }
}
exports.DBRepo = DBRepo;
