'use client'
import { Modal } from "antd";
import React from "react";

export default function Applications({
    showApplications,
    setShowApplications,
    selectedJob,
}: {
    showApplications: boolean
    setShowApplications: (showApplications: boolean) => void
    selectedJob : any
}) 
{
    return (
        <Modal 
            title = 'Applications'
            open = {showApplications}
            onCancel={() => setShowApplications(false)}
        >
        </Modal>
    )
}