import React, { useEffect, useState } from 'react';
import BaseDialog from "./components/BaseDialog"
import Select from "./components/Select"
import PriceInput from "./components/PriceInput"
import Image from "next/image";
import useStore from "../store/Assets";
import { assets } from 'chain-registry';

function SwapBox (){
    
    const symbols = ['ATOM', 'OSMO', 'JUNO'];
    const assetList = assets.find(({ chain_name}) => chain_name === 'osmosis');
    
    // const assetList = assets.find(({ symbol }) => symbols.indexOf(symbol) !== -1);
    const {getAssetList,setAssetList,setSelectedChain,getSelectedChain} = useStore()
    
    useEffect(() => {
        setAssetList(assetList.assets)
      }, []);
    const options = [
        { key: 1, label: 'Option 1' },
        { key: 2, label: 'Option 2' },
        { key: 3, label: 'Option 3' },
      ];
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (option) => {
        setSelectedOption(option);
    };
    const [isOpen, setIsOpen] = useState(false);
return (
    <>
    <button style={{width:"200px",height:"80px",background:"green",borderRadius:"10px",color:"white",border:"none"}} onClick={() => setIsOpen(true)}>
        Open The Dialog
    </button>
    <BaseDialog
        isOpen={isOpen}
        title='Deposit ATOM'
        onClose={() => setIsOpen(false)}
        closeOnClickModal={false}
        renderContent={ () => {return (
            <>
                <div style={{display: "flex",justifyContent: "space-between",marginTop:'40px',color: '#848fa0'}}>
                    <Select
                        data={assetList.assets}
                        value={selectedOption}
                        onChange={handleChange}
                        placeholder="Select an option..."
                        clearable
                        filterable
                        iconComponent={() => <span>🔍</span>}
                    />
                    <Image
                        src="/transferTo.svg"
                        alt="transferTo"
                        style={{alignSelf:"center",marginTop: "20px",color: '#848fa0'}}
                        width={16}
                        height={16}
                        priority
                    />
                    <Select
                        data={assetList.assets}
                        value={selectedOption}
                        onChange={handleChange}
                        placeholder="Select an option..."
                        clearable
                        filterable
                        // next自带的Image组件的src不能传入Func，如若可以，修改组件就可以循环发送fetch请求获取到svg的代码显示了
                        iconComponent={() => <span>🔍</span>}
                    />
                </div>
                <div style={{marginTop:'40px',color: '#848fa0'}}>
                    <PriceInput 
                        // 暂时没添加事件触发机制
                        rightRemarkFunc={() => {return <>
                                <span>Available </span>
                                <strong> 2 ATOM</strong>
                        </>}}
                        // 暂时没添加事件触发机制
                        selectFunc={() => {
                            return <>
                                <span>Max</span>
                                <span>1/2</span>
                                <span>1/3</span>
                            </>
                        }}
                    />
                </div>
                <div style={{display:"flex",backgroundColor:'#edf2fa',clear:'both',marginTop:'60px',padding:"8px",borderRadius:'4px'}}>
                    <Image
                        src="/timer.svg"
                        alt="timer"
                        style={{alignSelf:"center",paddingRight:'4px'}}
                        width={20}
                        height={20}
                        priority
                    />
                    <div style={{float:"left"}}>
                        <span>Estimated time:</span>
                        <strong>20 seconds</strong>
                    </div>
                </div>
            </>
        )
            }
        }
        renderFooter={ () => {
            return <>
                <button style={{background:"#2c2c2c",color:'white'}}>
                    Transfer
                </button>
                <button style={{background:"white",color:'#848fa0'}}>
                    cancel
                </button>
            </>
        }}
    />
            
    </>
) 
}

export default SwapBox;