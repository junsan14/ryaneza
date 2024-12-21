
import { Link } from "@inertiajs/react";

export default function AdminMenu (){

    return(
        <>  
            <li className="drop-down_items_item">
               <Link href={route('bistro.create')}>Create Bistro </Link>
            </li>
            <li className="drop-down_items_item">
               <Link href={route('users.edit.index')}>Edit User </Link>
            </li>
        </>

        )
	
}
