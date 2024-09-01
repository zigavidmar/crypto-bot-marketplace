import Image from "next/image"
import { FileObject } from '@supabase/storage-js'
import { supabaseClient } from "@/utils/supabase/client"
import { Ticket } from '@/types/database/tickets'

async function getTicketFiles(ticketId: string) {
    return await supabaseClient
        .storage
        .from('files')
        .list(ticketId, {
            limit: 5,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        })
}

export default async function TicketFiles({ ticketId }: { ticketId: string }) {
    const { data: files, error: filesError } = await getTicketFiles(ticketId)

    if (filesError) {
        console.error(filesError)
    }

    if (!files) {
        return (
            <div>
                <p>No files found</p>
            </div>
        )
    }

    return (
        <div>
            {files.map(file => (
                <FilePreview key={file.id} file={file} ticketId={ticketId} />
            ))}
        </div>
    )
}

function FilePreview({ file, ticket }: { file: FileObject, ticket: Ticket }) {
    return (
        <div className="flex items-center gap-2 border rounded-md h-14 w-14 relative">
            <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/${ticket.id}/${file.name}`}
                alt={file.name}
                objectFit="cover"
                layout="fill"
                className="rounded-md"
                objectPosition="center"
            />
        </div>
    )
}