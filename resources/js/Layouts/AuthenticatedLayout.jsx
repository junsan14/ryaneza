import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {

    return (
        <div className="">
            <main>{children}</main>
        </div>
    );
}
