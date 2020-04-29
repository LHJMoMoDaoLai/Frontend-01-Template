### 作业一：convertStringToNumber
```
function ConvertStringToNumber(string,x){
    if(arguments.length<2){
        x=10
    }
    var chart  = string.split("");
    var number = 0
    var i= 0
    while(i<chart.length&&chart[i] !='.'){
        number = number * x
        number += chart[i].codePointAt(0)-'0'.codePointAt(0)
        i++
    }
    if(chart[i] == '.'){
        i++
    }
    var fraction = 1
    while(i<chart.length){
        fraction = fraction / x
        number += (chart[i].codePointAt(0)-'0'.codePointAt(0))*fraction
        i++
    }
    // fraction = fraction /x
    return number
}
```
### 作业二：ConvertNumberToString

``` 
function ConvertNumberToString(number,x){
    var integer = Math.floor(number)
    let fraction = String(number).match(/\.\d+$/);
    if (fraction) {
        fraction = fraction[0].replace('.', '');
    }
    var string = ""
    while(integer>0){
        string = String(integer % x)+string;
        integer = Math.floor(integer / x)
    }
    return fraction?`${string}.${fraction}`:string
}
```
### 作业三：找出 JavaScript 标准里有哪些对象是我们无法实现出来的，都有哪些特性？写一篇文章，放在学习总结里。
* Bound Function Exotic Objects
    *  Internal Slots of Bound Function Exotic Objects
        *  [[BoundTargetFunction]]
        *  [[BoundThis]]
        *  [[BoundArguments]] 
    *  methods
        *   [[Call]]( thisArgument, argumentsList )
        *   [[Construct]] ( argumentsList, newTarget )
        *   BoundFunctionCreate ( targetFunction, boundThis, boundArgs )
* Array Exotic Objects
    * property
        * length 
    *  methods
       *  [[DefineOwnProperty]] ( P, Desc )
       *  ArrayCreate ( length [ , proto ] )
       *  ArraySpeciesCreate ( originalArray, length )
       *  ArraySetLength ( A, Desc )
* String Exotic Objects
    * property
      *  length
    *  methods
       *  [[GetOwnProperty]] ( P )
       *  [[DefineOwnProperty]] ( P, Desc )
       *  [[OwnPropertyKeys]] ( )
       *  StringCreate ( value, prototype )
       *  StringGetOwnProperty ( S, P )
*  Arguments Exotic Objects
   *  Internal Slots
      *  [[ParameterMap]] 
   *  methods
      *  [[GetOwnProperty]] ( P )
      *  [[DefineOwnProperty]] ( P, Desc )
      *  [[Get]] ( P, Receiver )
      *  [[Set]] ( P, V, Receiver )
      *  [[Delete]] ( P )
      *  CreateUnmappedArgumentsObject ( argumentsList )
      *  CreateMappedArgumentsObject ( func, formals, argumentsList, env )
      *  MakeArgGetter ( name, env )
      *  MakeArgSetter ( name, env )
*  Integer-Indexed Exotic Objects
   *  Internal Slots
      *   [[ViewedArrayBuffer]]
      *   [[ArrayLength]]
      *   [[ByteOffset]]
      *   [[TypedArrayName]] 
   *   methods
      * [[GetOwnProperty]] ( P )
      * [[HasProperty]] ( P )
      * [[DefineOwnProperty]] ( P, Desc )
      * [[Get]] ( P, Receiver )
      * [[Set]] ( P, V, Receiver )
      * [[OwnPropertyKeys]] ( )
      * IntegerIndexedObjectCreate ( prototype, internalSlotsList )
      * IntegerIndexedElementGet ( O, index )
      * IntegerIndexedElementSet ( O, index, value )
* Module Namespace Exotic Objects
  * Internal Slot
    * [[Module]]
    * [[Exports]] 
    * [[Prototype]] 
  * methods
    * [[GetPrototypeOf]]
    * [[SetPrototypeOf]] ( V )
    * [[IsExtensible]] ( )
    * [[PreventExtensions]] ( )
    * [[GetOwnProperty]] ( P )
    * [[DefineOwnProperty]] ( P, Desc )
    * [[HasProperty]] ( P )
    * [[Get]] ( P, Receiver )
    * [[Set]] ( P, V, Receiver )
    * [[Delete]] ( P )
    * [[OwnPropertyKeys]] ( )
    * ModuleNamespaceCreate ( module, exports )
* Immutable Prototype Exotic Objects
  * Internal Slot
    * [[Prototype]] 
  * methods
    * [[SetPrototypeOf]] ( V )
    * SetImmutablePrototype ( O, V )
* Proxy Object Internal Methods and Internal Slots
  * Internal Slot
    *  [[ProxyHandler]]
    *  [[ProxyTarget]]
 *  methods
    *  [[GetPrototypeOf]]
    *  [[SetPrototypeOf]]
    *  [[IsExtensible]] 
    *  [[PreventExtensions]] 
    *  [[GetOwnProperty]] 
    *  [[DefineOwnProperty]] 
    *  [[HasProperty]] 
    *  [[Get]] 
    *  [[Set]] 
    *  [[Delete]] 
    *  [[OwnPropertyKeys]] 
    *  [[Call]] 
    *  [[Construct]] 
    *  ProxyCreate ( target, handler )
  




    





