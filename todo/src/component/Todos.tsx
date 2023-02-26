import { useState, useEffect } from 'react';
import { api } from './api';

type Todo = string;
type Todos = {
    id: string,
    item: string
    status: string
}

const Todos = (props: any) => {
    const [todos, set_todos] = useState<[] | Todos[]>([]);
    let [todo, set_todo] = useState<Todo>('')
    useEffect(() => {
        api.getItem().then(res => {
            if (res.data.resCode === 200) {
                set_todos(res.data.todos)
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const handleDelete = (id: string) => {
        api.deletItem({ id: id }).then(res => {
            if (res.data.resCode === 200) {
                set_todos(res.data.todos)
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!todo || todo === '') {
            return;
        }
        api.postItem({ item: todo }).then(res => {
            if (res.data.resCode === 200) {
                set_todos(res.data.todos)
                set_todo('')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    // const updateTodo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.MouseEvent<HTMLInputElement>, id: string) => {
    //     const temp = [...todos];
    //     const index = temp.findIndex((item: Todos) => item.id === id);
    //     temp[index].item = e.currentTarget.value;

    //     set_todos(temp);

    // }
    const handleUpdate = (id: string) => {
        const temp = [...todos];
        const index = temp.findIndex(item => item.id === id);
        const item = temp[index].status === 'done' ? 'pending' : 'done';

        api.updateItem({ id: id, status: item }).then(res => {
            if (res.data.resCode === 200) {
                set_todos(res.data.todos)
            }
        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <>

            <form onSubmit={handleSubmit} className="row mb-4">
                <div className="col-md-10">
                    <input type="text" className="form-control" placeholder="create list item" value={todo} onChange={(e) => set_todo(e.target.value)} />
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-primary float-end">Submit</button>
                </div>
            </form>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Task</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((item: any) => {
                                return <tr key={`${item.id}-item-todo`}>
                                    <td>
                                        <input type="checkbox" defaultChecked={item.status === 'done'} onClick={() => handleUpdate(item.id)} />
                                    </td>
                                    <td>
                                        <span className={`${item.status === 'done' ? 'text-decoration-line-through' : ''}`}> {item.item} </span>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                            <i className="bi bi-trash3" />
                                        </button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}

export default Todos;