"use client"
import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  ListItemPrefix,
  Textarea,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
 
export function CreateWorkspaceModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <>
     <Button onClick={handleOpen} fullWidth variant="text" size="sm" className="flex flex-row gap-2 items-center justify-center">
                <ListItemPrefix>
                  <PlusIcon strokeWidth={3} className="h-6 w-6" />
                </ListItemPrefix>
                  <span>New Workspace</span>
                </Button>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card  className="mx-auto w-full max-h-[95%] text-black">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Create New Workspace
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
             
            >
              Enter all the necessary informaton about the workspace.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Name
            </Typography>
            <Input  variant="standard" label="text" size="lg" crossOrigin={undefined} />
            <Typography className="-mb-2" variant="h6">
              Description
            </Typography>
            <Textarea className="text-black" variant="standard" label="Standard" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" crossOrigin={undefined} />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
