import * as React from 'react'
import { useBoolean } from '@fluentui/react-hooks';
import { DefaultButton,Panel,TextField,Dropdown,ChoiceGroup,PrimaryButton,Slider } from '@fluentui/react';
const PanelItems:React.FC<{}>=()=>{
    const [isOpen,{setTrue:openPanel,setFalse:dismissPanel}]=useBoolean(false);
    return(
        <>
        <DefaultButton
        text='Open Panel'
        onClick={openPanel}
        />
<Panel
headerText='Basic Panel'
isOpen={isOpen}
onDismiss={dismissPanel}
closeButtonAriaLabel='Close'
>
<p>Write your panel content here</p>
<form>
    <TextField
    label='Name'
    placeholder='Enter your name'
    iconProps={{iconName:'people'}}
    />
     <TextField
    label='Email'
    placeholder='Enter your email'
    iconProps={{iconName:'mail'}}
    />
    <Dropdown
    label='Department'
    options={[
        {key:'HR',text:'HR'},
        {key:'IT',text:'IT'},
        {key:'Finance',text:'Finance'},
    ]}
    />
    <ChoiceGroup
    label='Gender'
    options={[
        {key:'Male',text:'Female'},
        {key:'Female',text:'Female'}
    ]}
    />
    <Slider
    label='Age'
    min={0}
    max={100}
    step={1}
    />
     <TextField
    label='Address'
    placeholder='Enter your address'
    iconProps={{iconName:'home'}}
    multiline
    rows={5}
    />
    <br/>
    <PrimaryButton
    label='Submit'
    onClick={()=>alert('form submiteed')}
    iconProps={{iconName:'save'}}
    />
</form>
</Panel>
        </>
    )
}
export default PanelItems;
