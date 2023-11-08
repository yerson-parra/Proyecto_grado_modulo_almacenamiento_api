import Role from "../models/Role.models.js"
export const createRoles = async () => {
    try {
        const count =await Role.estimatedDocumentCount()

        if (count > 0 ) return;

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'admin'}).save(),
            new Role({name: 'moderador'}).save()
        ])

        console.log(values)
    } catch (error) {
        console.error(error)
    }
}