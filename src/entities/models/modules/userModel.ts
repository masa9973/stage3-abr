import { UserMast } from '../..';
import { generateUUID } from '../../..';
import { BaseModel } from './_baseModel';

export class UserModel extends BaseModel<UserMast> {
    // ============================================
    // getters
    // ============================================
    get userID() {
        return this.mast.userID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    get updatedAt() {
        return this.mast.updatedAt;
    }
    get userIcon() {
        if (this.mast.userIcon) {
            return this.mast.userIcon.url;
        } else {
            return this.repositoryContainer.s3Repository.getSampleImage().url;
        }
    }
    // ============================================
    // getter / setter
    // ============================================
    get name() {
        return this.mast.name;
    }
    set name(input: string) {
        this.mast.name = input;
    }
    get email() {
        return this.mast.email;
    }
    set email(input: string) {
        this.mast.email = input;
    }
    get role() {
        return this.mast.role;
    }
    set role(input: string) {
        this.mast.role = input;
    }
    get userHotelID() {
        return this.mast.userHotelID;
    }
    set userHotelID(input: string) {
        this.mast.userHotelID = input;
    }
    // ============================================
    // validation
    // ============================================
    get isRegisterble() {
        return true;
    }
    // ============================================
    // functions
    // ============================================
    /**
     * アイコン画像をセットする
     * @param file
     */
    async setIcon(file: File) {
        const path = `user/${this.userID}/iconImage/${new Date().getTime()}`;
        this.mast.userIcon = await this.repositoryContainer.s3Repository.addFile(path, file);
    }

    /**
     * ユーザー情報を新規登録、または更新する
     */
    async register() {
        if (this.isRegisterble) {
            const now = new Date().getTime();
            if (this.isNew) {
                this.mast.createdAt = now;
                this.mast.updatedAt = now;
                await this.repositoryContainer.userMastRepository.addUserMast(this.mast);
            } else {
                this.mast.updatedAt = now;
                await this.repositoryContainer.userMastRepository.updateUserMast(this.mast);
            }
            this.isNew = false;
        }
    }

    // hotelIDを紐付ける関数
}
