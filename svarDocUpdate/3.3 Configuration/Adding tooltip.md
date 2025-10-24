# Adding tooltip

# **Adding a default tooltip**

To add a default tooltip that displays the task name, do the following:

- import the **Tooltip** component from Gantt
- wrap the **Gantt** element inside the **Tooltip** element
- pass the [**api**](https://docs.svar.dev/react/gantt/api/how_to_access_api) object (as a ref) to the **Tooltip** component

Example:

```jsx
import { useState }from "react";
import { getData }from "../data";
import { Gantt, Tooltip }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction Example() {
const [api, setApi] = useState(null);

return (
    <Tooltip api={api}>
      <Gantt
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        init={setApi}
      />
    </Tooltip>
  );
}

```

# **Adding a custom tooltip**

To add a custom template to a tooltip:

- import the **Tooltip** component from Gantt
- prepare your custom React template component
- import your custom template
- add the component as the value of the Tooltip **content** prop
- wrap the **Gantt** element inside the **Tooltip** element
- pass the [**api**](https://docs.svar.dev/react/gantt/api/how_to_access_api) object (as a ref) to the **Tooltip** component

Example:

```jsx
import { useState }from "react";
import { getData }from "../data";
import { Gantt, Tooltip }from "@svar-ui/react-gantt";
import MyTooltipContentfrom "../custom/MyTooltipContent.jsx";

const data = getData();

exportdefaultfunction ExampleCustom() {
const [api, setApi] = useState(null);

return (
    <Tooltip api={api} content={MyTooltipContent}>
      <Gantt
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        init={setApi}
      />
    </Tooltip>
  );
}

```

Below is an example of the custom template component for a tooltip:

```jsx
import { format }from "date-fns";

const mask = "yyyy.MM.dd";

exportdefaultfunction MyTooltipContent({ data }) {
if (!data)returnnull;

return (
    <div className="data">
      <div className="text">
        <span className="caption">{data.type}:</span>
        {data.text}
      </div>
      <div className="text">
        <span className="caption">start:</span>
        {format(data.start, mask)}
      </div>
      {data.end && (
        <div className="text">
          <span className="caption">end:</span>
          {format(data.end, mask)}
        </div>
      )}
    </div>
  );
}

```

CSS for the custom tooltip (put in a CSS file and import it where appropriate):

```css
.data {
    white-space: nowrap;
    background-color: var(--wx-tooltip-background);
    padding: 3px 8px;
}

.text {
    font-family: var(--wx-font-family);
    color: var(--wx-color-primary-font);
    font-size: 13px;
    text-transform: capitalize;
    margin-bottom: 5px;
}

.text:last-child {
    margin-bottom: 0;
}

.caption {
    font-weight: 700;
}

```

[**Previous**Adding custom task type](https://docs.svar.dev/react/gantt/guides/configuration/add_custom_task)