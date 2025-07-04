"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const db_2 = require("./db");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "user signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "user already Exists "
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASSWORD);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect credit "
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.body.type;
    const link = req.body.link;
    const title = req.body.title;
    yield db_1.ContentModel.create({
        title,
        type,
        link,
        //@ts-ignore
        userId: req.userId,
        tags: [],
    });
    res.json({
        message: "content added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // @ts-ignore
        const userId = req.userId;
        const searchValue = (_a = req.query.searchValue) === null || _a === void 0 ? void 0 : _a.toString().trim();
        // Prepare MongoDB query
        const query = { userId };
        if (searchValue) {
            // Case-insensitive partial match on link
            query.link = { $regex: searchValue, $options: "i" };
        }
        const content = yield db_1.ContentModel.find(query).populate("userId", "username");
        // ✅ Use "content" key (expected by frontend)
        res.status(200).json({
            content,
        });
    }
    catch (err) {
        console.error("Error fetching content:", err);
        res.status(500).json({
            error: "Failed to fetch content",
        });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteOne({
        _id: contentId, // Fixed: changed from contentId to _id
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "deleted"
    });
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_2.LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_2.LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash
        });
        res.json({ hash });
    }
    else {
        yield db_2.LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        });
        res.json({ message: "removed link" });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_2.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({ userId: link.userId });
    const user = yield db_1.UserModel.findById(link.userId);
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
app.listen(3000);
