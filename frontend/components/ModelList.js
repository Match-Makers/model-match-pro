export default function ModelList() {
  return (
    <div className="flex flex-row items-center flex-1 align-middle list-group">
      <div>
        <ul>
          <li className="list-group-item list-group-item-action">Model A</li>
          <li
            href="#"
            className="list-group-item list-group-item-action list-group-item-primary"
          >
            Model B
          </li>
          <li className="list-group-item list-group-item-action list-group-item-secondary">
            Model C
          </li>
          <li className="list-group-item list-group-item-action list-group-item-success">
            Model D
          </li>
          <li className="list-group-item list-group-item-action list-group-item-danger">
            Model E
          </li>
          <li className="list-group-item list-group-item-action list-group-item-warning">
            Model F
          </li>
          <li className="list-group-item list-group-item-action list-group-item-info">
            Model G
          </li>
          <li className="list-group-item list-group-item-action list-group-item-light">
            Model H
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            Model I
          </li>
        </ul>
        <button className="btn btn-primary">Add Models</button>
      </div>
      <div>
        <p className="flex flex-1 text-center">
          The results will appear in this div
        </p>
      </div>
    </div>
  );
}
