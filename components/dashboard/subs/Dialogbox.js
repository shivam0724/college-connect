import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/shadcn/ui/dialog";
import { Button } from "@/components/shadcn/ui/button";

const ConfirmDeleteButton = ({ id, action }) => {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        await action(id);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="rounded-2xl">
                    <img src="/bin.svg" alt="bin" className='w-5.5' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDeleteButton;