import { Photo } from "../db/users";
import { AppDataSource } from "../db/db";
const photo = new Photo()
photo.name = "slinger"
photo.description = "iam a polar bair"
photo.filename = "photo.jpg"
photo.views = 1
photo.isPublished = true

AppDataSource.manager.save(photo).then(
    () => {
        console.log(photo)
    }
).catch((err) => { console.log(err) })

