function useUserRole(access, userid) {
    let userRole = null

    if (access?.owner === userid) {
        userRole = "owner"
    } else if (access?.editors?.some((user) => user.id === userid)) {
        userRole = "editor"
    } else if (access?.viewers?.some((user) => user.id === userid)) {
        userRole = "viewer"
    }
    return { userRole }
}

export default useUserRole