type TabType = "a" | "b"; //enum

interface TabProps<T extends TabType> {
  tabs: { [ket in T]: string };
  tabPanel:{ [ket in T]: string|React.ReactElement };
  default: T
}

const useTab = <T extends TabType>({tabs,tabPanel,default  }:TabProps<T>)=>{
  const [selected, setSelected] = useState<T>(default)

  const tabList = Object.keys(tabs).map((item)=> ({type: item, name: tabs[item as T]}))

  const handleSelect = (type: T)=>setSelected(type)

  const contents = tabPanel?.[selected]

  return {tabList, contents, handleSelect}

}