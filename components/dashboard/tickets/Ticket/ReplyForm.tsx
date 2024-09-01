"use client";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/Textarea'
import React, { useState } from 'react'

export default function TicketReplyForm() {
    const [message, setMessage] = useState("");

    return (
        <div className="flex flex-col gap-2 items-end sticky bottom-0">
            <Textarea placeholder="Reply to this ticket" />
            <Button>Reply</Button>
        </div>
    )
}
