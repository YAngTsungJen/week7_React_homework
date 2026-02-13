export const emailValidition = {
    required:'請輸入 Email',
    pattern: {
        value: /^\S+@\S+$/i,
        message: "Email 格式不正確"
    }
}