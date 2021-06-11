import _axios from "@/core/plugins/axios";

export const scoreService = {
    getAll() {
        return _axios.get(`video-api/v1`);
    }
}
