import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox'
import classNames from 'classnames'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgChevronDown from './chevron-down.svg?include'
import s from './style.module.css'

function TabsAsDropdown({
  tabLabels,
  activeTabIdx,
  setActiveTabIdx,
  hasHeading,
}) {
  const activeLabel = tabLabels.filter((_l, idx) => idx == activeTabIdx)[0]
  return (
    <div
      className={classNames(s.tabsAsDropdown, { [s.hasHeading]: hasHeading })}
    >
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
