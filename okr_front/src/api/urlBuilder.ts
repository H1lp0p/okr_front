const UrlBuilder = {
    baseUrl: "http://90.188.93.70:39965",
    user: {
        register: () => `${UrlBuilder.baseUrl}/account/register`,
        login: () => `${UrlBuilder.baseUrl}/account/login`,
        logout: () => `${UrlBuilder.baseUrl}/account/logout`,
        getInfo: () => `${UrlBuilder.baseUrl}/account/user`
    },
    group:{
        subGroupAdd: (id:string) => `${UrlBuilder.baseUrl}/group/favourite/${id}/subgroup/add`,
        add: (groupName: string) => `${UrlBuilder.baseUrl}/group/favourite/${groupName}/group/add`,
        subGroupIdGet: () => `${UrlBuilder.baseUrl}/group/subgroupIdGet`,
        search: () => `${UrlBuilder.baseUrl}/group/searchGroup`,
        favourite: () => `${UrlBuilder.baseUrl}/group/favourite`,
        delete: (groupName:string) => `${UrlBuilder.baseUrl}/${groupName}/group/delete`,
        subGroupDelete: (subGroupId: string) => `${UrlBuilder.baseUrl}/${subGroupId}/subgroup/delete`
    },
    tools:{
        addTeacher: (id:string) => `${UrlBuilder.baseUrl}/tools/teacher/${id}/add`,
        addSubgroup: (subGroupName:string, groupName:string) => `${UrlBuilder.baseUrl}/tools/subgroup/${subGroupName}/add/to/group/${groupName}`,
        addStudentToSubgroup: () => `${UrlBuilder.baseUrl}/tools/student/add/subgroup`,
        addStunentToGroup: () => `${UrlBuilder.baseUrl}/tools/add/group`,
        addGroup: (group:string) => `${UrlBuilder.baseUrl}/tools/group/${group}/add`,
        deleteTeacher: (teacherId: string) => `${UrlBuilder.baseUrl}/tools/teacher/${teacherId}/delete`,
        deleteSubgroup: (subgroupId: string) => `${UrlBuilder.baseUrl}/tools/subgroup/${subgroupId}/delete`,
        deleteSubgoupStudent: () => `${UrlBuilder.baseUrl}/tools/student/delete/subgroup`,
        deleteGroupStudent: () => `${UrlBuilder.baseUrl}/tools/student/delete/group`,
        deleteGroup: (groupName: string) => `${UrlBuilder.baseUrl}/tools/group?${groupName}/delete`,
        getUsers: () => `${UrlBuilder.baseUrl}/tools/users`
    },
    requests:{
        prolong: (requestId:string) => `${UrlBuilder.baseUrl}/requests/${requestId}/prolong`,
        edit: (requestId:string) => `${UrlBuilder.baseUrl}/requests/${requestId}/edit`,
        getAll: () => `${UrlBuilder.baseUrl}/requests`,
        create: () => `${UrlBuilder.baseUrl}/requests`,
        confirm: (requestId:string) => `${UrlBuilder.baseUrl}/requests/${requestId}/confirmation`,
        getMy: () => `${UrlBuilder.baseUrl}/requests/my`,
        export: () => `${UrlBuilder.baseUrl}/requests/export/csv`,
        exportConfirmations: () => `${UrlBuilder.baseUrl}/requests/confirmations/export`,
        trueExport: () => `${UrlBuilder.baseUrl}/requests/confirmations/export/filtered`,
        exportConfirmation: (confirmationId: string) => `${UrlBuilder.baseUrl}/requests/confirmation/${confirmationId}/export`
    },
    admin: {
        addDeansWorker: () => `${UrlBuilder.baseUrl}/admin/deansWorker/add`,
        deleteDeansWorker: () => `${UrlBuilder.baseUrl}/admin/deansWorker/delete`
    },
    students:{
        get: () => `${UrlBuilder.baseUrl}/student`,
        gant: () => `${UrlBuilder.baseUrl}/student/gant`,
    }
}
export default UrlBuilder