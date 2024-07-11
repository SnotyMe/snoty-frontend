import { descriptorAsString, type FlowNode, type NodeMetadata } from "$lib/model/nodes";

export const example_nodes: FlowNode[] = [
    {
        id: 'discord',
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
        id: 'moodle',
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
            'mapper'
        ]
    },
    {
        id: 'mapper',
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
            'discord'
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
            position: "END",
            settings: [
                {
                    name: "webhookUrl",
                    hidden: false,
                    censored: true,
                    descriptive: true
                }
            ],
            input: [
                {
                    name: "content",
                    hidden: true,
                    descriptive: true,
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
            position: "START",
            input: null,
            output: [
                {
                    name: "name",
                    censored: false,
                    hidden: false,
                    descriptive: false
                }
            ],
            settings: [
                {
                    name: "baseUrl",
                    hidden: false,
                    censored: false,
                    descriptive: true
                },
                {
                    name: "appSecret",
                    hidden: false,
                    censored: true,
                    descriptive: false
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
            position: "MIDDLE",
            input: [],
            output: [],
            settings: [
                {
                    name: "engine",
                    hidden: false,
                    censored: false,
                    descriptive: true
                }
            ],
            displayName: "Mapper"
        }
    )

    return map;
}
