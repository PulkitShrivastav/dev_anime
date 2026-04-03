export interface IsSaved {
    [key: string]: boolean
}

export interface AllFiles {
    fileID: number,
    file_name: string,
    html_code: string,
    js_code: string,
    css_code: string,
    buttons: string
}

export interface MyUsers {
    message: string,
    userID: number,
    username: string,
    firstName: string,
}

export interface FileNames {
    file_id: number,
    file_name: string
}
