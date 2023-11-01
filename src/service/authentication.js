import app from './connection'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword } from 'firebase/auth'
import axios from 'axios';

const authentication = getAuth(app)

export const signUpAccount = (account, success, unsuccess) => {
    createUserWithEmailAndPassword(authentication, account.email, account.password)
    .then((userCredential) => {
        const user = userCredential.user
        const user_account = {
            uid: user.uid,
            userName: account.userName,
            email: user.email
        }
        axios.post(`${process.env.REACT_APP_API}/sign-up`, user_account)
        .then((response) => {
            success(response.data.message)
        })
        .catch(() => {
            unsuccess('การสร้างบัญชีล้มเหลว')
        })
    })
    .catch((error) => {
        const errorCode = error.code
        if(errorCode === 'auth/invalid-email'){
            unsuccess('รูปแบบอีเมลไม่ถูกต้อง')
        }else if(errorCode === 'auth/email-already-in-use'){
            unsuccess('มีผู้ใช้งานอีเมลนี้แล้ว กรุณาเปลี่ยนอีเมล')
        }else{
            unsuccess('เกิดข้อผิดพลาดที่ไม่รู้จัก')
        }
    })
}

export const signInAccount = (account, success, unsuccess) => {
    signInWithEmailAndPassword(authentication, account.email.toLowerCase(), account.password)
    .then((userCredential) => {
        axios.post(`${process.env.REACT_APP_API}/sign-in`, {email: userCredential.user.email})
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            success('เข้าสู่ระบบสำเร็จ')
        })
        .catch((error) => {
            unsuccess('เข้าสู่ระบบล้มเหลว')
        })
    })
    .catch((error) => {
        unsuccess('ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง')
    })
}

export const signOutAccount = (success, unsuccess) => {
    signOut(authentication)
    .then(() => {
        localStorage.removeItem('token')
        success('ออกจากระบบสำเร็จ')
    })
    .catch(() => {
        unsuccess('ออกจากระบบไม่สำเร็จ')
    })
}

export const resetPassword = (email, success, unsuccess) => {
    sendPasswordResetEmail(authentication, email)
    .then(() => {
        success(`กรุณาตรวจสอบอีเมล ${email} เพื่อเปลี่ยนรหัสผ่าน`)
    })
    .catch(() => {
        unsuccess('การกู้คืนรหัสผ่านล้มเหลว')
    })
}

export const updateUsernameAccount = (account, success, unsuccess) => {
    const token = localStorage.getItem('token')
    axios.post(`${process.env.REACT_APP_API}/sign-in-authentication`, {}, {headers: {
        'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
        const email = response.data.decoded.email
        signInWithEmailAndPassword(authentication, email.toLowerCase(), account.password)
        .then((userCredential) => {
            axios.patch(`${process.env.REACT_APP_API}/edit-account-username`, {email:userCredential.user.email, username:account.username})
            .then((response) => {
                if(response.data.status){
                    success('แก้ไขโปรไฟล์สำเร็จ')
                }
            })
            .catch((error) => {
                unsuccess('แก้ไขโปรไฟล์ไม่สำเร็จ')
            })
        })
        .catch((error) => {
            unsuccess('รหัสผ่านเก่าไม่ถูกต้อง')
        })
    })
    .catch((error) => {
        unsuccess('แก้ไขโปรไฟล์ไม่สำเร็จ')
    })
}

export const updateUsernameAndPasswordAccount = (account, success, unsuccess) => {
    const token = localStorage.getItem('token')
    axios.post(`${process.env.REACT_APP_API}/sign-in-authentication`, {}, {headers: {
        'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
        const email = response.data.decoded.email
        signInWithEmailAndPassword(authentication, email.toLowerCase(), account.password)
        .then((userCredential) => {
            updatePassword(userCredential.user, account.newPassword)
            .then(() => {
                axios.patch(`${process.env.REACT_APP_API}/edit-account-username`, {email:userCredential.user.email, username:account.username})
                .then((response) => {
                    if(response.data.status){
                        success('แก้ไขโปรไฟล์สำเร็จ')
                    }
                })
                .catch((error) => {
                    unsuccess('แก้ไขโปรไฟล์ไม่สำเร็จ')
                })
            })
            .catch((error) => {
                unsuccess('แก้ไขโปรไฟล์ไม่สำเร็จ')
            })
        })
        .catch((error) => {
            unsuccess('รหัสผ่านเก่าไม่ถูกต้อง')
        })
    })
    .catch((error) => {
        unsuccess('แก้ไขโปรไฟล์ไม่สำเร็จ')
    })
}