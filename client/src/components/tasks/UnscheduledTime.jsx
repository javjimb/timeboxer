import React from "react";
import Typography from "@material-ui/core/Typography";

export default function UnscheduledTime({ taskList }) {

    let totalTime = 0;
    taskList.forEach( task => {
        if (task.status == 'new') {
            totalTime += task.duration;
        }
    })

    return (
        <div>
            <Typography variant="h6">
                Total unscheduled time: {totalTime} hrs
            </Typography>
        </div>
    )
}
