import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgChevronDown from '!!raw-loader!./chevron-down.svg'
import s from './style.module.css'

function TabsAsDropdown({ tabLabels, activeTabIdx, setActiveTabIdx }) {
  const activeLabel = tabLabels.filter((_l, idx) => idx == activeTabIdx)[0]
  return (
    <div className={s.tabsAsDropdown}>
      <ListboxInput className={s.listboxInput} onChange={setActiveTabIdx}>
        <ListboxButton className={s.listboxButton}>
          {activeLabel}
          <InlineSvg className={s.dropdownIcon} src={svgChevronDown} />
        </ListboxButton>
        <ListboxPopover className={s.listboxPopover} portal={false}>
          <ListboxList className={s.listboxList}>
            {tabLabels.map((tabLabel, idx) => {
              return (
                <ListboxOption
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  value={idx.toString()}
                  className={s.listboxOption}
                >
                  {tabLabel}
                </ListboxOption>
              )
            })}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

export default TabsAsDropdown
