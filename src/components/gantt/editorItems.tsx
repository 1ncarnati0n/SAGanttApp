import { Combo, RadioButtonGroup } from "@svar-ui/react-core";
import { defaultEditorItems, registerEditorItem } from "@svar-ui/react-gantt";

import { users } from "../../data/users";
import { TASK_TYPES } from "./taskConfig";

const AssignedCombo = (props: any) => {
  const { value, options = [], onChange } = props;

  return (
    <Combo
      options={options}
      value={value}
      onChange={onChange}
      clear
      placeholder="Assign to a person"
    >
      {({ option }: { option: { label?: string } }) => (
        <span>{option?.label ?? ""}</span>
      )}
    </Combo>
  );
};

registerEditorItem("radio", RadioButtonGroup);
registerEditorItem("assigned-combo", AssignedCombo);

const items: Array<Record<string, any>> = defaultEditorItems.map((item) => ({ ...item }));

const typeIndex = items.findIndex((item) => item.key === "type");
if (typeIndex !== -1) {
  items.splice(
    typeIndex,
    1,
    {
      key: "type",
      comp: "radio",
      label: "Type",
      options: TASK_TYPES.map((type) => ({
        ...type,
        value: type.id,
      })),
      config: {
        type: "inline",
      },
    },
    {
      key: "assigned",
      comp: "assigned-combo",
      label: "Assigned",
      options: users.map((user) => ({
        ...user,
        value: user.id,
      })),
    },
  );
}

items.forEach((item) => {
  if (item.comp === "date") {
    item.config = {
      ...(item.config ?? {}),
      time: true,
    };
  }
});

export const editorItems = items;
