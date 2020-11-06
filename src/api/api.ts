import axios from "axios";
import {baseUrl} from "../common/vars";
import {LoginFormDataType, PhotosType, ProfileType, UserType} from "../common/types";

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'API-KEY': '3686af22-2cf3-4b79-baf4-ea638c7d81da'
    }
});

enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
//todo
/*enum ResultCodesWithCaptchaEnum {
    Captcha = 10
}*/
type ResponseType<D> = {
    data: D
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type AuthMeDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

type ResponseListType<I> = {
    items: Array<I>
    totalCount: number
    error: string
}

type CaptchaType = {
    url: string
}

export let api = {
    authAPI: {
        authMe() {
            return instance.get<ResponseType<AuthMeDataType>>(`/auth/me`).then(r => r.data);
        },
        login(formData: LoginFormDataType) {
            return instance.post<ResponseType<LoginResponseDataType>>('/auth/login', formData).then(r => {
                return r.data
            });
        },
        logout() {
            return instance.delete<ResponseType<{}>>('/auth/login').then(r => r.data);
        }
    },
    userAPI: {
        getUsers(currentPage: number, countOnPage: number) {
            return instance.get<ResponseListType<UserType>>(`/users?page=${currentPage}&count=${countOnPage}`).then(r => r.data);
        },
        follow(userId: number) {
            return instance.post<ResponseType<{}>>(`/follow/${userId}`).then(r => r.data);
        },
        unfollow(userId: number) {
            return instance.delete<ResponseType<{}>>(`/follow/${userId}`).then(r => r.data);
        },

    },
    profileAPI: {
        getProfile(userId: number) {
            return instance.get<ProfileType>(`/profile/${userId}`).then(r => r.data);
        },
        getStatus(userId: number) {
            return instance.get<string>(`/profile/status/${userId}`).then(r => {
                return r;
            });
        },
        update(profile: ProfileType) {
            return instance.put<ResponseType<{}>>(`/profile`, profile).then(r => r.data);
        },
        uploadPhoto(photo: File) {
            const formData = new FormData()
            formData.append("image", photo)
            return instance.put<ResponseType<PhotosType>>(`/profile/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(r => r.data)
        },
        updateStatus(status: string) {
            return instance.put<ResponseType<{}>>(`/profile/status`, {status: status}).then(r => r.data);
        }
    },
    sequrity: {
        getCaptcha() {
            return instance.get<CaptchaType>(`/security/get-captcha-url`).then(r => r.data);
        }
    }
};