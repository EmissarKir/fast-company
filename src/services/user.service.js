import httpService from "./http.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    }

    // update: async (id, content) => {
    //     const { data } = await httpService.put(userEndPoint + id, content);
    //     return data;
    // },

    // create: async (content) => {
    //     const { data } = await httpService.post(userEndPoint, content);
    //     return data;
    // },
    // delete: async (id) => {
    //     const { data } = await httpService.delete(userEndPoint + id);
    //     return data;
    // }
};
export default userService;

// get: async (id) => {
//   const { data } = await httpService.get(userEndPoint + id);
//   return data;
// },
