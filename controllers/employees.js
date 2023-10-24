const {prisma} = require('../prisma/prisma-client')

const getAllEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()
        console.log(employees)
        res.status(200).json(employees)
    } catch (err) {
        res.status(500).json({
            message: 'Employees are not available'
        })
    }
}

const addEmployee = async (req, res) => {
    try {
        const data = req.body

        if (!data.firstName || !data.lastName || !data.age || !data.address) {
            return res.status(400).json({
                message: 'All inputs must be filled'
            })
        }

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })

        

        return res.status(201).json(employee)

    } catch (err) {
        res.status(500).json(err.message)
    } 
}

const removeEmployee = async (req, res) => {
    const {id} = req.body 

    try {
        await prisma.employee.delete({
            where: {
                id
            }
        })

        res.status(204).json('OK')


    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

const editEmployee = async (req, res) => {
    const data = req.body
    const id = data.id

    try {
        await prisma.employee.update({
            where: {
                id,
            },
            data
        })

        res.status(204).json('OK')


    } catch (err) {
        return res.status(500).json(err.message, {
            message: 'Something went wrong'
            
        })
    }

}


const getEmployee = async (req, res) => {

    const {id} = req.params

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })

        res.status(200).json(employee)


    } catch(err) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}


module.exports = {
    getAllEmployees,
    addEmployee,
    removeEmployee,
    editEmployee,
    getEmployee
}
