import React from 'react'

const TTC = ({ price, vat }) => ((price/100)*vat)+price

export default TTC