import React from 'react'
import { Link } from 'react-router-dom'

const LinkPage = () => {
    return (
        <section className="bg-gray-200 p-4">
            <h1 className="text-3xl font-bold mb-4">Links</h1>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">For first user</h2>
                <Link
                    to="/"
                    className="text-blue-500 hover:underline mr-4"
                >
                    Home
                </Link>
                <Link
                    to="/security/swith_role"
                    className="text-blue-500 hover:underline"
                >
                    Change role
                </Link>
            </div>
        </section>
    )
}

export default LinkPage