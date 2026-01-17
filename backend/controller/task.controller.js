import Task from "../models/task.model.js";
import User from "../models/user.model.js";

const createTask = async (req, res) => {
    const {id} = req.user;
    console.log("isComin",id);
    
    const { title, description, dueDate, priority } = req.body;
    
    if(!title || !description || !dueDate || !priority){
        return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
    }

    try {
        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            assignedTo: id, 
        });

        // Add task to the user's task list
        await User.findByIdAndUpdate(id, { $push: { tasks: task._id } });

        return res.status(201).json(
            {
             success:true,
             message: 'Task created successfully',
             task 
            }
        );
    } catch (error) {
        res.status(500).json({ 
                success:false, 
                message:error?.message 
            });
    }
};

const getTasksForUser = async (req,res) => {
   const {id} = req.user;

   try {
    if(!id){
        return res.status(400).json({
            success:false,
            message:'something went wrong'
        })
    }
    const tasks = await Task.find({assignedTo:id});
 
    if(!tasks){
      return res.status(201).json({
         success:false,
         message:'There is no tasks related to this user',
         tasks:[]
      })
    }
 
    res.status(200).json({
     success:true,
     message:'successfully get all tasks related to user !!',
     tasks:tasks
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error?.message
    })
   }
}

const getTaskById = async (req,res) => {
   const {id} = req.params;
   console.log("id",id);
   try {
     if(!id){
        return res.status(400).json({
            success:false,
            message:'something went wrong'
        })
     }

     const task = await Task.findById(id);
     console.log(task);
     

     if(!task){
        return res.status(400).json({
            success:false,
            message:'No task related to this taskId'
        })
     }

     res.status(200).json({
        success:true,
        message:'successfully get task by given id',
        task
     })

   } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
      })
   }
}

const updateTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const {id} = req.params;
    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, dueDate, priority },
            { new: true }
        );
        if (!task) return res.status(404).json({
            success:false,
             message: 'Task not found' 
        });

        res.status(200).json({ 
            success:true,
            message: 'Task updated successfully', 
            task 
        });
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message: error?.message
        });
    }
};


const deleteTask = async (req,res) => {
   const {id} = req.params;
   try {
     const deletedTask = await Task.findByIdAndDelete(id);
     
     if(!deletedTask){
        return res.status(401).json({
            success:false,
            message:'No task found related to this id'
        })
     }

     return res.status(200).json({
        success:true,
        message:'Task deleted successfully !!'
     })
   } catch (error) {
      return res.status(500).json({
        success:true,
        message:error?.message
      })
   }
}

const updateTaskStatus = async (req, res) => {
    const {status} = req.body;
    
    const {id} = req.params;
    console.log("iddd",id,status);
    
    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!task){
            return res.status(404).json({ message: 'Task not found' });
        } 

        res.status(200).json({
            success:true,
            message: 'Task status updated successfully',
            task 
        });
    } catch (error) {
        res.status(500).json({
             success:false,
             message:error?.message
        });
    }
};


export {
    createTask,
    getTasksForUser,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus
}
