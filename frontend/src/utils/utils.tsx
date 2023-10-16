export function shapeToFrets(shape: string): number[] {
    // The API returns a chord shape as a string, example: 3X0003
    const asArray = shape.split('');
    let frets: number[] = [];
    asArray.forEach((char) => {
        if (char == "X") {
            frets.push(-1);
            return;
        }
        frets.push(+char);
    });
    return frets;
}