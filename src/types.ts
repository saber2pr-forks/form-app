export interface ElementsDictionary {
    [index: string]: ElementObject;
}

export interface StateObject {
    elements: {
        byID: ElementsDictionary;
        allIDs: string[];
    };
    application: {
        viewMode: string;
    };
}

export interface ElementObject {
    accessID: string;
    elementType: string;
    userAssignedID: string;
    value: string;
    formula: string;
}