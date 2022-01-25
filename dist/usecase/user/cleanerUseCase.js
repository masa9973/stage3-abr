"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanerUsecase = void 0;
const entities_1 = require("../../entities");
const models_1 = require("../../entities/models");
const recordModel_1 = require("../../entities/models/modules/recordModel");
const scoreItemModel_1 = require("../../entities/models/modules/scoreItemModel");
const util_1 = require("../../util");
class CleanerUsecase {
    constructor(repositoryContainer, modelFactory) {
        this.repositoryContainer = repositoryContainer;
        this.modelFactory = modelFactory;
    }
    // =======================
    // user
    // =======================
    async fetchMyUserModel() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            // 存在しない場合
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(me);
    }
    async fetchUserModelByUserID(userID) {
        const user = await this.repositoryContainer.userMastRepository.fetchUserMastByUserID(userID);
        if (!user) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(user);
    }
    async fetchAllUserByHotelID(userHotelID) {
        const users = await this.repositoryContainer.userMastRepository.fetchAllUserByHotelID(userHotelID);
        return users.map((user) => this.modelFactory.UserModel(user)).sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
    }
    // =======================
    // record
    // =======================
    async createNewRecord() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        else {
            const recordHotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof recordHotelID === "string") {
                return this.modelFactory.RecordModel(recordModel_1.RecordModel.getBlanc('', '', 0, 0, 0, recordHotelID), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    async fetchAllRecordsByHotelID(recordHotelID) {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(recordHotelID);
        return records.map((record) => this.modelFactory.RecordModel(record)).sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
    }
    async fetchRecordsByCleanerID(userID) {
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByCleanerID(userID);
        return records.map((item) => this.modelFactory.RecordModel(item));
    }
    async fetchRecordByRecordID(recordID) {
        const record = await this.repositoryContainer.recordMastRepository.fetchRecordByRecordID(recordID);
        if (!record) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.RecordModel(record);
    }
    // =======================
    // room
    // =======================
    async createNewRoom(roomName) {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof hotelID === "string") {
                return this.modelFactory.RoomModel(models_1.RoomModel.getBlanc(roomName, hotelID), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    // 施設に紐づく部屋を取得する
    async fetchRoomsByHotelID(roomHotelID) {
        const res = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(roomHotelID);
        return res.map((item) => this.modelFactory.RoomModel(item));
    }
    async fetchRoomByRoomID(roomID) {
        const room = await this.repositoryContainer.roomMastRepository.fetchRoomByRoomID(roomID);
        if (!room) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.RoomModel(room);
    }
    // =======================
    // scoreItem
    // =======================
    async createNewScoreItem(scoreItemName) {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof hotelID === "string") {
                return this.modelFactory.ScoreItemModel(scoreItemModel_1.ScoreItemModel.getBlanc(scoreItemName, hotelID), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    async fetchScoreItemsByHotelID(scoreItemHotelID) {
        const res = await this.repositoryContainer.scoreItemMastRepository.fetchScoreItemsByHotelID(scoreItemHotelID);
        return res.map((item) => this.modelFactory.ScoreItemModel(item));
    }
    async fetchScoreItemByScoreItemID(scoreItemID) {
        const scoreItem = await this.repositoryContainer.scoreItemMastRepository.fetchScoreItemByScoreItemID(scoreItemID);
        return this.modelFactory.ScoreItemModel(scoreItem);
    }
    // =======================
    // hotel
    // =======================
    // hotelを登録
    async createNewHotel(hotelName) {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof hotelID === "string") {
                return this.modelFactory.HotelModel(models_1.HotelModel.getBlanc(hotelID, hotelName), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
}
exports.CleanerUsecase = CleanerUsecase;
