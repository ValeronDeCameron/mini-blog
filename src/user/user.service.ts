import { Injectable, Post } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    private data = [
        {
            id: 1,
            name: "Oleksii",
            password: "1234"
        },
        {
            id: 2,
            name: "Alex",
            password: "mmnzx"
        }
    ]
    private nums = [1,2,3,4,5,6,7,8,9]
    private converts = {
        "а": "a",
        "б": "b",
        "в": "v",
        "г": "h",
        "ґ": "g",
        "д": "d",
        "е": "e",
        "є": "ye",
        "ж": "zh",
        "з": "z",
        "и": "y",
        "і": "i",
        "ї": "yi",
        "й": "y",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "kh",
        "ц": "ts",
        "ч": "ch",
        "ш": "sh",
        "щ": "shch",
        "ь": "",
        "ю": "yu",
        "я": "ya",
        "’": "",
        "'": ""
    }
    
    findAll() {
        return this.data;
    }

    findUserById(id) {
        let user = this.data.find(user => id === user.id )
        if (!user) throw new NotFoundException("user not found")  
        return user
    }

    createNewUser(dto: createUserDto) {

        const {firstName, lastName, password, email} = dto;
        let isBanned = false;
        let isVerified = email ? true : false;
        let nickname = lastName?.split("").map(el =>  this.converts[el.toLowerCase()]).join("")
        for (let i = 0; i<4; i++) {
            nickname += String(this.nums[Math.floor(Math.random()*this.nums.length)])
        }
        const name = `${firstName} ${lastName ?? ""}`.trim();
        let id = this.data.length + Date.now()
        let newUser = {
            id: id,
            name,
            password,
            email,
            nickname,
            isBanned,
            isVerified
        }

        this.data.push(newUser);
        return {newUser, message: "created!"}
    }

    updateUser(id, dto: updateUserDto) {
        let oldUserIndex = this.data.findIndex( user => id === user.id);
        if (oldUserIndex === -1) throw new NotFoundException("Smth going wrong with update");
        let oldUser = this.data[oldUserIndex]
        let updatedUser = {
            ...oldUser,
            ...dto
        }
        this.data[oldUserIndex] = updatedUser;
        return {updatedUser, message: "User successfully updated"}
    }

    deleteUser(id) {
        let userIndex = this.data.findIndex(user => id === user.id)
        if (userIndex === -1) throw new NotFoundException("User not found")
        this.data.splice(userIndex, 1)
        return {ok: true, message: "User successfully deleted"}
    }
}
