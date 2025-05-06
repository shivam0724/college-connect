"use client";
import getUser from "@/lib/user";
import Loading from "../Loading";
import useSWR from "swr";
import { Button } from "../shadcn/ui/button";

const fetcher = async () => {
    const user = await getUser();

    return user ? JSON.parse(user) : null;
}

export default function Profile({ session }) {
    const { data: user, error } = useSWR("user", fetcher);

    if (!user) {
        return <Loading />
    }

    if (error) {
        console.error('[Profile.js]: ', error);
        return <div className="w-full flex flex-col items-center py-2">Error loading user data</div>
    }

    const rows = {
        personal: [
            { name: "Enrollment", value: "enrollment" },
            { name: "Username", value: "username" },
            { name: "Father's Name", value: "fathername" },
            { name: "Mother's Name", value: "mothername" },
            { name: "Date of Birth", value: "dob" },
            { name: "Email", value: "email" },
            { name: "Phone", value: "phone" },
        ],
        class: [
            { name: "Course", value: "course" },
            { name: "Branch", value: "branch" },
            { name: "Year", value: "year" },
            { name: "Section", value: "section" },
            { name: "College", value: "name" },
        ],
        contact: [
            { name: "Address", value: "address" },
            { name: "City", value: "city" },
            { name: "State", value: "state" },
            { name: "Country", value: "country" },
            { name: "Pincode", value: "pincode" },
        ],
        academics: [
            { name: "Tenth", value: "tenth" },
            { name: "Twelfth", value: "twelfth" },
            { name: "UG", value: "ug" },
            { name: "Diploma", value: "diploma" },
            { name: "PG", value: "pg" },
        ]
    }
    return (
        <div className="w-full flex flex-col items-center py-2">
            <div className="fcji border-b w-full pb-2">
                <div className="rounded-full overflow-hidden border-4 border-blue-500 h-24">
                    <img src={user.image || "/avatar/avatar.svg"} alt={`${user.name}'s avatar`} className="max-w-22 min-w-16" />
                </div>

                <div className="text-center mt-4">
                    <h1 className="text-xl font-semibold text-gray-800">{user.name}</h1>
                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                </div>
            </div>

            <div className="bg-white p-4 w-full flex flex-col overflow-y-auto max-h-[40vh] gap-y-2 scroll-smooth">
                <InfoCard title={"Personal details"} fields={rows.personal} data={user} />
                <InfoCard title={"Contact details"} fields={rows.contact} data={user?.address} />
                <InfoCard title={"College details"} fields={rows.class} data={user?.college} />
                {/* <InfoCard title={"Academics Information"} fields={rows.academics} data={user?.academics} /> */}
            </div>
            <div className="flex justify-between items-center mt-4 w-full px-4">
                <Button>Edit Profile</Button>
            </div>
        </div>
    );
}

function InfoCard({ title, fields, data }) {
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="text-lg font-medium text-gray-800 border-b pb-2">{title}</h2>
            <div className="grid grid-cols-2 gap-x-6">
                {fields.map((column) => {
                    let value = data[column.value], formattedValue;
                    if (typeof value === "object") {
                        return null;
                    }

                    if (column.value === "dob") {
                        formattedValue = new Date(value).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "2-digit" });
                    }
                    else if (column.value === "address") {
                        formattedValue = `${data.address1}, ${data.address2}`;
                    }
                    else {
                        formattedValue = value;
                    }

                    return (
                        <div key={column.value} className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">{column.name}</span>
                            <span className="text-gray-800">{formattedValue}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}