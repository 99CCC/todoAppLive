interface nodeUpdateInput {
    body?: string,
    completed?: boolean
}

export async function updateNodeModel(input: nodeUpdateInput){
    try {
        
        let key = [];
        let value = [];

        for (let prop of Object.keys(input) as (keyof nodeUpdateInput)[]){
            if(input.hasOwnProperty(prop)){
                key.push(prop);
                value.push(input[prop]);
            }
        }

        const query = ``;
    } catch (error) {
        throw error;
    }
}