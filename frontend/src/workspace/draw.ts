type TElmenet = any
type TElements = TElmenet[]

export class Draw {
    private elements: TElements // Need to freeze array

    getElements(): TElements {
        return this.elements
    }

    setElements(elements: TElements): void {
        this.elements = elements
    }

    removeAll(): void {
        this.elements = []
    }

    execute(): void {
        this.elements.forEach((el) => el.draw())
    }
}
