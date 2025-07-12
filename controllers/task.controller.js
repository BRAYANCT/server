import { pool } from "../db.js"

export const getTareas=async(req,res)=>{
    //Forma1 con async-await    
        // pool.query('SELECT * FROM taskPrueba WHERE id = ?',[req.params.id])
        // .then(result=>{
        //     res.json(result[0])
        // }).catch(err=>{  
        //     res.status(500).json({
        //         message: 'Error al obtener la tarea',
        //         error: err.message
        //     })
        // })

    const [result]=await pool.query('SELECT * FROM taskPrueba WHERE id = ?',[req.params.id])
    if(result[0]===undefined){
        return res.status(404).json(({
            message:'tarea no encontada'
        }))
    }
     res.json(result[0])

}
export const getTarea=async(req,res)=>{
    //Forma1 con async-await
const [result]=await pool.query('SELECT * FROM taskPrueba ORDER BY created_at DESC')
    res.json(result)
    //Forma2 sin async-await
/*      const result=pool.query('SELECT * FROM taskPrueba ORDER BY id ASC')
    result.then((data)=>{
        res.json(data[0])
    }).catch((err)=>{
        res.status(500).json({
            message: 'Error al obtener las tareas',
            error: err.message
        })
    })     */

}
export const createTareas=async(req,res)=>{
    const {title,description}=req.body    

    //Forma1 con async-await
   const result= await pool.query('INSERT INTO taskPrueba(title,description) VALUES(?,?)',[title,description])
    res.json({
        body: {
            // message: 'Tarea creada',
            // taskPrueba: {
            //     /* id:result.insertId, */
            // }
            title,
            description
        }
    })
   //forma2 sin async-await no olvuden quitar el async
    /*  pool.query('INSERT INTO taskPrueba(title,description) VALUES(?,?)',[title,description])
    .then(result=>{
        res.json({
            message: 'Tarea creada',
            body: {

                // taskPrueba: {id:result.insertId,title,description}
                taskPrueba: {title,description}
            }
        })
    }) */
}
export const updateDoneTareas=async(req,res)=>{
    //Forma1 con async-await
    const [result]=await pool.query('UPDATE taskPrueba SET done = ? WHERE id = ?',[req.body.done, req.params.id])
    try{
        if(result.affectedRows===0){
            return res.status(404).json({
                message: 'Tarea no encontrada'
            })
        }
        res.json({
            message: 'Tarea actualizada',
            body: {
                taskPrueba: {
                    id: req.params.id,
                    done: req.body.done
                }
            }
        })
    }catch(err){
        return res.status(500).json({message:err.message})    
    }
}
export const updateTareas=async(req,res)=>{
    //Forma1 con async-await
        const [result]=await pool.query('UPDATE taskPrueba SET title = ?, description = ? WHERE id = ?',[req.body.title, req.body.description, req.params.id])
        try{

            if(result.affectedRows===0){
            return res.status(404).json({
                message: 'Tarea no encontrada'
            })
            }
        res.json({
            message: 'Tarea actualizada',
            body: {
                taskPrueba: {
                    id: req.params.id,
                    title: req.body.title,
                    description: req.body.description
                }
            }
        })
        }catch(err){
        return res.status(500).json({message:error.message})    
        }
    // sin mensaje
    // res.json({id: req.params.id,title: req.body.title,description: req.body.description})
    //Forma2 sin async-await
    // pool.query('UPDATE taskPrueba SET title = ?, description = ? WHERE id = ?',[req.body.title, req.body.description, req.params.id   ])
    // .then(result=>{
    //     res.json({
    //         message: 'Tarea actualizada',
    //         body: {
    //             taskPrueba: {
    //                 id: req.params.id,
    //                 title: req.body.title,
    //                 description: req.body.description
    //             }
    //         }
    //     })
    // }).catch(err=>{
    //     res.status(500).json({
    //         message: 'Error al actualizar la tarea',
    //         error: err.message
    //     })
    // })
}
export const deleteTareas=(req,res)=>{
    //    const [result]=await pool.query('DELETE FROM taskPrueba WHERE id = ?',[req.params.id])
    //     console.log(result.affectedRows);
    //     if(result.affectedRows===0){
    //         return res.status(404).json({
    //             message: 'Tarea no encontrada'
    //         })
    //     }
    //     res.json({
    //         message: 'Tarea eliminada',
    //         body: {
    //             id: req.params.id
    //         }
    //     })
    //Forma2 sin async-await
   const result= pool.query('DELETE FROM taskPrueba WHERE id = ?',[req.params.id])
   .then(result=>{
    
       if(result[0].affectedRows===0)
    {
            return res.status(404).json({
                message: 'Tarea no encontrada'
            })
        }
       res.json({
            message: 'Tarea eliminada',
            body: {
                id: req.params.id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message: 'Error al eliminar la tarea',
            error: err.message
        }) 
    })

}
