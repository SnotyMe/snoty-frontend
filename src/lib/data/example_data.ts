import { descriptorAsString, type FlowNode, type NodeMetadata } from "$lib/model/nodes";

export const example_nodes: FlowNode[] = [
    {
        id: '668457aae3d25a0343c02a65',
        descriptor: {
            subsystem: "integration",
            type: "discord"
        },
        config: {
            "webhookUrl": "burh"
        },
        next: []
    },
    {
        id: '66845c03684ce914b6653899',
        descriptor: {
            subsystem: "integration",
            type: "moodle"
        },
        config: {
            baseUrl: "http://localhost:21080",
            username: "student",
            appSecret: "dfklsdjflkajdöflkajsdflkajsdkfjdafl"
        },
        next: [
            '668b126698c89f798550d004'
        ]
    },
    {
        id: '668b126698c89f798550d004',
        descriptor: {
            subsystem: "processor",
            type: "mapper"
        },
        config: {
            engine: "liquid",
            fields: {
                "content": "skidaddle skidoodle new assignment on moodle: `%name%`"
            }
        },
        next: [
            '668457aae3d25a0343c02a65'
        ]
    }
]

export const example_node_metadata: Map<string, NodeMetadata> = createExampleNodeMetadata()

function createExampleNodeMetadata() {
    const map = new Map<string, NodeMetadata>();

    map.set(
        descriptorAsString({
            subsystem: "integration",
            type: "discord"
        }),
        {
            input: [
                {
                    name: "content",
                    hidden: true,
                    censored: false
                }
            ],
            output: null,
            displayName: "Discord"
        }
    )
    map.set(
        descriptorAsString({
            subsystem: "integration",
            type: "moodle"
        }),
        {
            input: null,
            output: [
                {
                    name: "name",
                    censored: false,
                    hidden: false
                }
            ],
            displayName: "Moodle"
        }
    )
    map.set(
        descriptorAsString({
            subsystem: "processor",
            type: "mapper"
        }),
        {
            input: [],
            output: [],
            displayName: "Mapper"
        }
    )

    return map;
}
